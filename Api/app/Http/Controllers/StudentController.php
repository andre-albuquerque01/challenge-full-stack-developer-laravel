<?php

namespace App\Http\Controllers;

use App\Exceptions\GeneralException;
use App\Http\Requests\StudentRequest;
use App\Service\StudentService;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    private $studendService;

    public function __construct(StudentService $studendService)
    {
        $this->studendService = $studendService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return $this->studendService->index();
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StudentRequest $request)
    {
        try {
            return $this->studendService->store($request->validated());
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            return $this->studendService->show($id);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StudentRequest $request, string $id)
    {
        try {
            return $this->studendService->update($request->validated(), $id);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            return $this->studendService->destroy($id);
        } catch (\Exception $e) {
            throw new GeneralException('', $e->getCode(), $e);
        }
    }
}
