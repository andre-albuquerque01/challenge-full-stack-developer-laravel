<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            "name" => ["required", "string", "min:4", "max:255"],
            "email" => [
                "required",
                "email",
                "max:255",
                "min:2",
                "unique:users",
            ],
            "password" => [
                "required",
                "confirmed",
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
            "password_confirmation" => [
                "required",
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
        ];

        if ($this->method() === "PUT") {
            $rules["name"] = ["nullable", "string", "min:4", "max:255"];
            $rules["email"] = [
                "required",
                "email",
                "max:255",
                "min:2",
                Rule::unique('users', 'email')->ignore($this->user()->idUser, 'idUser'),
            ];
            $rules["password"] = [
                "required",
                Password::min(8)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised(),
            ];
            $rules["password_confirmation"] = ["nullable"];
        }
        return $rules;
    }
}
