<?php

namespace App\Http\Controllers\Api;

use App\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $events = Event::orderBy('created_at', 'desc')->get();

        return response()->json($events);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
        $validatedData = $request->validate([
            'eventName' => 'required',
            'eventStart' => 'required',
            'eventEnd' => 'required',
          ]);

          $eventDay = array_map(function($data){
              if($data['isChecked'] === true) {
                  return $data['value'];
              }
          }, $request->days);
        
          $filterDays = array_filter($eventDay);

          $days = implode(",", $filterDays);

          $event = Event::create([
            'event_name' => $validatedData['eventName'],
            'event_day' => $days,
            'event_start' => $validatedData['eventStart'],
            'event_end' => $validatedData['eventEnd'],
          ]);
  
          return response()->json($event->find($event->id));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
