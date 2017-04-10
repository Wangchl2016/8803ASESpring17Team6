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

Route::post('server_1/webapi/users', function (\Illuminate\Http\Request $request) {
    file_put_contents(storage_path('call.txt'), json_encode($request->all()));
    $user = [
        'email' => $request->input('email'),
        'password' => $request->input('password'),
        'username' => $request->input('username')
    ];
    if (!filter_var($user['email'], FILTER_VALIDATE_EMAIL)) {
        die('0');
        return ['error' => true];
        return response('error', 412)
            ->header('Content-Type', 'text/plain');
    } elseif (strlen($user['password']) < 1) {
        die('0');
        return ['error' => true];
        return response('error', 412)
            ->header('Content-Type', 'text/plain');
    } elseif (strlen($user['username']) < 1) {
        die('0');
        return ['error' => true];
        return response('error', 412)
            ->header('Content-Type', 'text/plain');
    }
    die('helloToken');
    return ['token' => 12490435827];
});

Route::get('server_1/webapi/users/login', function(\Illuminate\Http\Request $request) {
    $e = $request->get('email');
    $p = $request->get('password');
    if (!filter_var($e, FILTER_VALIDATE_EMAIL)) {
        die('0');
        return ['token' => 0];
        return response('error', 412)
            ->header('Content-Type', 'text/plain');
    } elseif (strlen($p) < 1) {
        die('0');
        return ['token' => 0];
        return response('error', 412)
            ->header('Content-Type', 'text/plain');
    }
    if ($e == 'valid@test.com' && $p == 'valid') {
        die('helloToken');
        return ['token' => 12490435827];
    } else {
        die('0');
        return ['token' => 0];
        return response('error', 404)
            ->header('Content-Type', 'text/plain');
    }
});

Route::get('api/users/{id}', function ($id) {
    return 'User '.$id;
});
