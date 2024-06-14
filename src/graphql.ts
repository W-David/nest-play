
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreatePostInput {
    title?: Nullable<string>;
    content?: Nullable<string>;
}

export class UpdatePostInput {
    id: number;
    title?: Nullable<string>;
    content?: Nullable<string>;
}

export class Post {
    __typename?: 'Post';
    id: number;
    title?: Nullable<string>;
    content?: Nullable<string>;
}

export abstract class IQuery {
    __typename?: 'IQuery';
    findOne?: Nullable<Post>;
    findAll?: Nullable<Nullable<Post>[]>;
}

export abstract class IMutation {
    __typename?: 'IMutation';
    create?: Nullable<Post>;
    update?: Nullable<Post>;
}

type Nullable<T> = T | null;
