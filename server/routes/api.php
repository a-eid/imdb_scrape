<?php

use Illuminate\Http\Request;
include(app_path().'/includes/PHP-IMDb-Scraper/imdb.php');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// movie Title - POSTER as image and RATING as stars
Route::post('/movies', function(Request $request ) {
    $imdb = new Imdb(); 
    $term = $request->input('term');
    $movieArray = $imdb->getMovieInfo($term);
    return response()->json( $movieArray );
});




