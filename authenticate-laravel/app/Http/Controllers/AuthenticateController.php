<?php

namespace App\Http\Controllers;

use App\Services\AuthenticateService;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AuthenticateController extends Controller
{
    private $authenticateService;

    public function __construct(AuthenticateService $authenticateService)
    {
        $this->authenticateService = $authenticateService;
    }

    public function authenticate(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required|max:255',
                'password' => 'required'
            ]);

            $result = $this->authenticateService->authenticate($request);

            return response()->json($result, 200);
        } catch (NotFoundHttpException $e) {
            return response()->json([
                "is_valid"=> false,
                "user"=> null,
                "parent_number"=> null
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "error" => $e
            ], 500);
        } 

    }
}
