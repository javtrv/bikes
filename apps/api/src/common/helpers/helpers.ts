import { BadRequestException } from "@nestjs/common";

export const handleDBError = (error: any, entity: string) => {
  console.log('--------- ERROR:', error.code);
  if (error.code === '23505') {
    throw new BadRequestException(`${entity} already exists`);
  } else {
    throw new Error('Internal server error');
  }
}