<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->whenHas("title"),
            'content' => $this->content,
            'image' => $this->image,
            'created_at' => $this->created_at,
            'user' => new UserResource($this->whenLoaded('user')),
            'pole' => new PoleResource($this->whenLoaded('pole')),
            'likers' => LikerResource::collection($this->whenLoaded('likers')),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
        ];
    }
}
