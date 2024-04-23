<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = DB::table('users')->find($this->pivot->user_id);

        return [
            'id' => $this->pivot->id,
            'body' => $this->pivot->body,
            'user' => $user ? ['id' => $user->id, 'name' => $user->name,'lname' => $user->lname] : null,
            'created_at' => $this->pivot->created_at,
        ];
    }
}
