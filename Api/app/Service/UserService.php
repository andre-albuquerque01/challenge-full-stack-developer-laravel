<?php

namespace App\Service;

use App\Exceptions\GeneralException;
use App\Http\Resources\AuthResource;
use App\Http\Resources\GeneralResource;
use App\Jobs\SendRecoverPasswordEmailJob;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService
{
    public function login(array $data)
    {
        try {
            if (!$token = auth()->attempt($data)) {
                return new GeneralResource(['error' => 'Unauthorized']);
            }
            return new AuthResource(['token' => $token]);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    public function store(array $data)
    {
        try {
            $data['password'] = Hash::make($data['password']);
            User::create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    public function update(array $data)
    {
        try {
            $user = auth()->user()->idUser;
            $user->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    public function show()
    {
        try {
            return new AuthResource(['user' => auth()->user()]);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    public function destroy()
    {
        try {
            auth()->user()->idUser->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    public function recoverPasswordSendEmail(string $email)
    {
        try {
            $user = User::where("email", $email)->first();
            if (!$user) throw new GeneralException("User not found");

            $token = Str::random(60);
            $passwordResetToken = DB::table('password_reset_tokens')->where('email', $email)->first();

            if ($passwordResetToken) {
                DB::table('password_reset_tokens')->where('email', $email)->update([
                    'token' => $token,
                    'created_at' => now(),
                ]);
            } else {
                DB::table('password_reset_tokens')->insert([
                    'email' => $user->email,
                    'token' => $token,
                    'created_at' => now(),
                ]);
            }

            SendRecoverPasswordEmailJob::dispatch($email, $token);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    public function resetPassword(array $data)
    {
        try {
            $passwordResetTokens = DB::table('password_reset_tokens')->where('token', $data['token'])->first();
            if (!isset($passwordResetTokens)) throw new GeneralException("Token invalid");

            User::where('email', $passwordResetTokens->email)->update([
                'password' => Hash::make($data['password']),
            ]);
            DB::table('password_reset_tokens')->where('token', $data['token'])->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }
}
