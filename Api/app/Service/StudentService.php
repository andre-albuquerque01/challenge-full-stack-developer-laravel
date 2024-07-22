<?php

namespace App\Service;

use App\Exceptions\GeneralException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\StudentResource;
use App\Models\Student;

class StudentService
{
    public function index()
    {
        try {
            $students = Student::all();
            return StudentResource::collection($students);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    public function store(array $data)
    {
        try {
            // $cpf = preg_replace('/[^0-9]/', '', $data["cpf"]);
            // $data["cpf"] = substr($cpf, 0, 3) . '.' . substr($cpf, 3, 3) . '.' . substr($cpf, 6, 3) . '-' . substr($cpf, 9, 2);
            Student::create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    public function show(int $ra)
    {
        try {
            $student = Student::where('ra', $ra)->first();
            if (!$student) throw new GeneralException('Student not found', 404);
            return new StudentResource($student);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    public function update(array $data, int $ra)
    {
        try {
            $student = Student::where('ra', $ra)->first();
            if (!$student) throw new GeneralException('Student not found', 404);
            $student->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    public function destroy(int $ra)
    {
        try {
            $student = Student::where('ra', $ra)->first();
            if (!$student) throw new GeneralException('Student not found', 404);
            $student->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }
}
