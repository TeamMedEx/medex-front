export type BlogPost = {
  title: string;
  id: number;
};

import { Controller, Get, Param, Render } from '@nestjs/common';


@Get(':id')
@Render('[id]')

public blogPost(@Param('id') id:string){
    return {}
}