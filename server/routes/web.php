<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('api/users', function (\Illuminate\Http\Request $request) {
    $user = [
        'email' => $request->input('email'),
        'password' => $request->input('password'),
        'name' => $request->input('name')
    ];
    if (!filter_var($user['email'], FILTER_VALIDATE_EMAIL)) {
        return response('error', 412)
            ->header('Content-Type', 'text/plain');
    } elseif (strlen($user['password']) < 1) {
        return response('error', 412)
            ->header('Content-Type', 'text/plain');
    } elseif (strlen($user['name']) < 1) {
        return response('error', 412)
            ->header('Content-Type', 'text/plain');
    }
    return json_encode($user);
});

Route::get('api/users/login', function(\Illuminate\Http\Request $request) {
    $e = $request->get('email');
    $p = $request->get('password');
    if (!filter_var($e, FILTER_VALIDATE_EMAIL)) {
        return response('error', 412)
            ->header('Content-Type', 'text/plain');
    } elseif (strlen($p) < 1) {
        return response('error', 412)
            ->header('Content-Type', 'text/plain');
    }
    if ($e == 'valid@test.com' && $p == 'valid') {
        return 'token';
    } else {
        return response('error', 404)
            ->header('Content-Type', 'text/plain');
    }
});

Route::get('api/users/{id}', function ($id) {
    return 'User '.$id;
});
