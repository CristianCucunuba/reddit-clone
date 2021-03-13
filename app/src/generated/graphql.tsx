import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  posts: Array<Post>;
  post?: Maybe<Post>;
  user?: Maybe<User>;
};

export type QueryPostArgs = {
  id: Scalars["Float"];
};

export type Post = {
  __typename?: "Post";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  title: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  username: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars["Boolean"];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
};

export type MutationCreatePostArgs = {
  title: Scalars["String"];
};

export type MutationUpdatePostArgs = {
  title?: Maybe<Scalars["String"]>;
  id: Scalars["Float"];
};

export type MutationDeletePostArgs = {
  id: Scalars["Float"];
};

export type MutationRegisterArgs = {
  input: UsernamePasswordInput;
};

export type MutationLoginArgs = {
  input: UsernamePasswordInput;
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type UsernamePasswordInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type UserCommonDataFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username"
>;

export type LoginMutationVariables = Exact<{
  input: UsernamePasswordInput;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & {
    user?: Maybe<{ __typename?: "User" } & UserCommonDataFragment>;
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type RegisterMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & {
    user?: Maybe<{ __typename?: "User" } & UserCommonDataFragment>;
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
  };
};

export type PostsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQuery = { __typename?: "Query" } & {
  posts: Array<{ __typename?: "Post" } & Pick<Post, "id" | "title">>;
};

export type UserQueryVariables = Exact<{ [key: string]: never }>;

export type UserQuery = { __typename?: "Query" } & {
  user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username">>;
};

export const UserCommonDataFragmentDoc = gql`
  fragment UserCommonData on User {
    id
    username
  }
`;
export const LoginDocument = gql`
  mutation Login($input: UsernamePasswordInput!) {
    login(input: $input) {
      user {
        ...UserCommonData
      }
      errors {
        field
        message
      }
    }
  }
  ${UserCommonDataFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const RegisterDocument = gql`
  mutation Register($username: String!, $password: String!) {
    register(input: { username: $username, password: $password }) {
      user {
        ...UserCommonData
      }
      errors {
        field
        message
      }
    }
  }
  ${UserCommonDataFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const PostsDocument = gql`
  query Posts {
    posts {
      id
      title
    }
  }
`;

export function usePostsQuery(
  options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
}
export const UserDocument = gql`
  query User {
    user {
      id
      username
    }
  }
`;

export function useUserQuery(
  options: Omit<Urql.UseQueryArgs<UserQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
}
