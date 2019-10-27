<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //
    protected $fillable = [
        'event_name', 'event_day', 'event_start', 'event_end'
    ];
}
