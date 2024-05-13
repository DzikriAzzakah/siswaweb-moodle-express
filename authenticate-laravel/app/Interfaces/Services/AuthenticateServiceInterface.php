<?php
namespace App\Interfaces\Services;

use Illuminate\Http\Request;

interface AuthenticateServiceInterface {
  public function authenticate(Request $request): array;
}