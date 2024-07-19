<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentRequest extends FormRequest
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
            ],
            "cpf" => [
                "required",
                "max:15",
                "min:11",
            ],
        ];

        if ($this->method() === "PUT") {
            $rules["name"] = ["nullable", "string", "min:4", "max:255"];
            $rules["email"] = [
                "nullable",
                "email",
                "max:255",
                "min:2",
            ];
            $rules["cpf"] = ["nullable"];
        }
        return $rules;
    }
}
