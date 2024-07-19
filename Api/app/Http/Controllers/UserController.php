<?php

namespace App\Http\Controllers;

use App\Exceptions\GeneralException;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\RecoverPasswordRequest;
use App\Http\Requests\UserRequest;
use App\Service\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function login(AuthRequest $request)
    {
        try {
            return $this->userService->login($request->validated());
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }
    public function store(UserRequest $request)
    {
        try {
            return $this->userService->store($request->validated());
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }
    public function show()
    {
        try {
            return $this->userService->show();
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }
    public function update(UserRequest $request)
    {
        try {
            return $this->userService->update($request->validated());
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    public function destroy()
    {
        try {
            return $this->userService->destroy();
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    public function recoverPasswordSendEmail(Request $request)
    {
        try {
            $validatedData = $request->validate(['email' => 'required|email']);
            return $this->userService->recoverPasswordSendEmail($validatedData['email']);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }
    public function resetPassword(RecoverPasswordRequest $request)
    {
        try {
            return $this->userService->resetPassword($request->validated());
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }
}
