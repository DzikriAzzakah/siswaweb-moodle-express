<?php

namespace App\Services;
use App\Interfaces\Services\AuthenticateServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AuthenticateService implements AuthenticateServiceInterface
{
  public function authenticate(Request $request): array
  {
    $user = DB::table("mdl_role_assignments AS mra")
      ->distinct()
      ->select(
        "mu.id",
        "mu.username",
        "mu.firstname AS first_name",
        "mu.lastname AS last_name",
        "mu.email",
        "mu.password",
        "mr.id AS role_id",
        "mr.shortname AS role_name"
      )
      ->join("mdl_user AS mu", "mu.id", "=" ,"mra.userid")
      ->join("mdl_role AS mr", "mr.id", "=" ,"mra.roleid")
      ->where("mu.username", $request->username)
      ->first();

    if ($user == null) {
      throw new NotFoundHttpException("User not Found");
    }

    if (!password_verify($request->password,$user->password)){
      return ["is_valid"=> false, "user"=> null, "parent_number"=> null];
    }

    // get user parent numbers
    $parentNumber = DB::table("mdl_user_info_data AS muid")
    ->select(
      "muid.data AS parent_number"
    )
    ->join("mdl_user_info_field AS muif", "muif.id", "=", "muid.fieldid")
    ->where("muif.shortname", "parentsNo")
    ->where("muid.userid", $user->id)
    ->first();

    return ["is_valid"=> true, "user"=> $user, "parent_number"=> $parentNumber->parent_number];
  }
}