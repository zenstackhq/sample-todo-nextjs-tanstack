/* eslint-disable */
import type { Prisma, User } from '@prisma/client';
import { useContext } from 'react';
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { RequestHandlerContext } from '@zenstackhq/tanstack-query/runtime/react';
import {
    query,
    infiniteQuery,
    postMutation,
    putMutation,
    deleteMutation,
} from '@zenstackhq/tanstack-query/runtime/react';
import type { PickEnumerable, CheckSelect } from '@zenstackhq/tanstack-query/runtime';

export function useCreateUser(
    options?: Omit<UseMutationOptions<User | undefined, unknown, Prisma.UserCreateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = postMutation<Prisma.UserCreateArgs, User, true>(
        'User',
        `${endpoint}/user/create`,
        options,
        fetch,
        invalidateQueries,
        true,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.UserCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, User, Prisma.UserGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.UserCreateArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, User, Prisma.UserGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useCreateManyUser(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.UserCreateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = postMutation<Prisma.UserCreateManyArgs, Prisma.BatchPayload, false>(
        'User',
        `${endpoint}/user/createMany`,
        options,
        fetch,
        invalidateQueries,
        false,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.UserCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserCreateManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.UserCreateManyArgs>>,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyUser<T extends Prisma.UserFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
    options?: UseQueryOptions<Array<Prisma.UserGetPayload<T>>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return query<Array<Prisma.UserGetPayload<T>>>('User', `${endpoint}/user/findMany`, args, options, fetch);
}

export function useInfiniteFindManyUser<T extends Prisma.UserFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
    options?: UseInfiniteQueryOptions<Array<Prisma.UserGetPayload<T>>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return infiniteQuery<Array<Prisma.UserGetPayload<T>>>('User', `${endpoint}/user/findMany`, args, options, fetch);
}

export function useFindUniqueUser<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
    options?: UseQueryOptions<Prisma.UserGetPayload<T>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return query<Prisma.UserGetPayload<T>>('User', `${endpoint}/user/findUnique`, args, options, fetch);
}

export function useFindFirstUser<T extends Prisma.UserFindFirstArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>,
    options?: UseQueryOptions<Prisma.UserGetPayload<T>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return query<Prisma.UserGetPayload<T>>('User', `${endpoint}/user/findFirst`, args, options, fetch);
}

export function useUpdateUser(
    options?: Omit<UseMutationOptions<User | undefined, unknown, Prisma.UserUpdateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = putMutation<Prisma.UserUpdateArgs, User, true>(
        'User',
        `${endpoint}/user/update`,
        options,
        fetch,
        invalidateQueries,
        true,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.UserUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, User, Prisma.UserGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.UserUpdateArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, User, Prisma.UserGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useUpdateManyUser(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.UserUpdateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = putMutation<Prisma.UserUpdateManyArgs, Prisma.BatchPayload, false>(
        'User',
        `${endpoint}/user/updateMany`,
        options,
        fetch,
        invalidateQueries,
        false,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.UserUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUpdateManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.UserUpdateManyArgs>>,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertUser(
    options?: Omit<UseMutationOptions<User | undefined, unknown, Prisma.UserUpsertArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = postMutation<Prisma.UserUpsertArgs, User, true>(
        'User',
        `${endpoint}/user/upsert`,
        options,
        fetch,
        invalidateQueries,
        true,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.UserUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUpsertArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, User, Prisma.UserGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.UserUpsertArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, User, Prisma.UserGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteUser(
    options?: Omit<UseMutationOptions<User | undefined, unknown, Prisma.UserDeleteArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = deleteMutation<Prisma.UserDeleteArgs, User, true>(
        'User',
        `${endpoint}/user/delete`,
        options,
        fetch,
        invalidateQueries,
        true,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.UserDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, User, Prisma.UserGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.UserDeleteArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, User, Prisma.UserGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteManyUser(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.UserDeleteManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = deleteMutation<Prisma.UserDeleteManyArgs, Prisma.BatchPayload, false>(
        'User',
        `${endpoint}/user/deleteMany`,
        options,
        fetch,
        invalidateQueries,
        false,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.UserDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserDeleteManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.UserDeleteManyArgs>>,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateUser<T extends Prisma.UserAggregateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserAggregateArgs>,
    options?: UseQueryOptions<Prisma.GetUserAggregateType<T>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return query<Prisma.GetUserAggregateType<T>>('User', `${endpoint}/user/aggregate`, args, options, fetch);
}

export function useGroupByUser<
    T extends Prisma.UserGroupByArgs,
    HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.UserGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.UserGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
        ? `Error: "by" must not be empty.`
        : HavingValid extends Prisma.False
        ? {
              [P in HavingFields]: P extends ByFields
                  ? never
                  : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
          }[HavingFields]
        : 'take' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
            : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
            : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends Prisma.True
        ? {}
        : {
              [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields],
>(
    args: Prisma.SelectSubset<T, Prisma.SubsetIntersection<T, Prisma.UserGroupByArgs, OrderByArg> & InputErrors>,
    options?: UseQueryOptions<
        {} extends InputErrors
            ? Array<
                  PickEnumerable<Prisma.UserGroupByOutputType, T['by']> & {
                      [P in keyof T & keyof Prisma.UserGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<T[P], Prisma.UserGroupByOutputType[P]>
                          : Prisma.GetScalarType<T[P], Prisma.UserGroupByOutputType[P]>;
                  }
              >
            : InputErrors
    >,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return query<
        {} extends InputErrors
            ? Array<
                  PickEnumerable<Prisma.UserGroupByOutputType, T['by']> & {
                      [P in keyof T & keyof Prisma.UserGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<T[P], Prisma.UserGroupByOutputType[P]>
                          : Prisma.GetScalarType<T[P], Prisma.UserGroupByOutputType[P]>;
                  }
              >
            : InputErrors
    >('User', `${endpoint}/user/groupBy`, args, options, fetch);
}

export function useCountUser<T extends Prisma.UserCountArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserCountArgs>,
    options?: UseQueryOptions<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.UserCountAggregateOutputType>
            : number
    >,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return query<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.UserCountAggregateOutputType>
            : number
    >('User', `${endpoint}/user/count`, args, options, fetch);
}
