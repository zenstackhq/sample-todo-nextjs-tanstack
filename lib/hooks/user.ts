/* eslint-disable */
import type { Prisma, User } from '@prisma/client';
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError } from '@zenstackhq/tanstack-query/runtime-v5';
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateUser(
    options?: Omit<UseMutationOptions<User | undefined, DefaultError, Prisma.UserCreateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.UserCreateArgs, DefaultError, User, true>(
        'User',
        'POST',
        `${endpoint}/user/create`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, User, Prisma.UserGetPayload<T>> | undefined,
                    DefaultError,
                    Prisma.SelectSubset<T, Prisma.UserCreateArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, User, Prisma.UserGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useCreateManyUser(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.UserCreateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.UserCreateManyArgs, DefaultError, Prisma.BatchPayload, false>(
        'User',
        'POST',
        `${endpoint}/user/createMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserCreateManyArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<T, Prisma.UserCreateManyArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyUser<
    TArgs extends Prisma.UserFindManyArgs,
    TQueryFnData = Array<Prisma.UserGetPayload<TArgs> & { $optimistic?: boolean }>,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.UserFindManyArgs>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>(
        'User',
        `${endpoint}/user/findMany`,
        args,
        options,
        fetch,
        optimisticUpdate,
    );
}

export function useInfiniteFindManyUser<
    TArgs extends Prisma.UserFindManyArgs,
    TQueryFnData = Array<Prisma.UserGetPayload<TArgs>>,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.UserFindManyArgs>,
    options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey'>,
) {
    options = options ?? { initialPageParam: undefined, getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>(
        'User',
        `${endpoint}/user/findMany`,
        args,
        options,
        fetch,
    );
}

export function useSuspenseFindManyUser<
    TArgs extends Prisma.UserFindManyArgs,
    TQueryFnData = Array<Prisma.UserGetPayload<TArgs> & { $optimistic?: boolean }>,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.UserFindManyArgs>,
    options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'User',
        `${endpoint}/user/findMany`,
        args,
        options,
        fetch,
        optimisticUpdate,
    );
}

export function useSuspenseInfiniteFindManyUser<
    TArgs extends Prisma.UserFindManyArgs,
    TQueryFnData = Array<Prisma.UserGetPayload<TArgs>>,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.UserFindManyArgs>,
    options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey'>,
) {
    options = options ?? { initialPageParam: undefined, getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>(
        'User',
        `${endpoint}/user/findMany`,
        args,
        options,
        fetch,
    );
}

export function useFindUniqueUser<
    TArgs extends Prisma.UserFindUniqueArgs,
    TQueryFnData = Prisma.UserGetPayload<TArgs> & { $optimistic?: boolean },
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args: Prisma.SelectSubset<TArgs, Prisma.UserFindUniqueArgs>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>(
        'User',
        `${endpoint}/user/findUnique`,
        args,
        options,
        fetch,
        optimisticUpdate,
    );
}

export function useSuspenseFindUniqueUser<
    TArgs extends Prisma.UserFindUniqueArgs,
    TQueryFnData = Prisma.UserGetPayload<TArgs> & { $optimistic?: boolean },
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args: Prisma.SelectSubset<TArgs, Prisma.UserFindUniqueArgs>,
    options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'User',
        `${endpoint}/user/findUnique`,
        args,
        options,
        fetch,
        optimisticUpdate,
    );
}

export function useFindFirstUser<
    TArgs extends Prisma.UserFindFirstArgs,
    TQueryFnData = Prisma.UserGetPayload<TArgs> & { $optimistic?: boolean },
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.UserFindFirstArgs>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>(
        'User',
        `${endpoint}/user/findFirst`,
        args,
        options,
        fetch,
        optimisticUpdate,
    );
}

export function useSuspenseFindFirstUser<
    TArgs extends Prisma.UserFindFirstArgs,
    TQueryFnData = Prisma.UserGetPayload<TArgs> & { $optimistic?: boolean },
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.UserFindFirstArgs>,
    options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'User',
        `${endpoint}/user/findFirst`,
        args,
        options,
        fetch,
        optimisticUpdate,
    );
}

export function useUpdateUser(
    options?: Omit<UseMutationOptions<User | undefined, DefaultError, Prisma.UserUpdateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.UserUpdateArgs, DefaultError, User, true>(
        'User',
        'PUT',
        `${endpoint}/user/update`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, User, Prisma.UserGetPayload<T>> | undefined,
                    DefaultError,
                    Prisma.SelectSubset<T, Prisma.UserUpdateArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, User, Prisma.UserGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useUpdateManyUser(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.UserUpdateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.UserUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>(
        'User',
        'PUT',
        `${endpoint}/user/updateMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUpdateManyArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<T, Prisma.UserUpdateManyArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertUser(
    options?: Omit<UseMutationOptions<User | undefined, DefaultError, Prisma.UserUpsertArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.UserUpsertArgs, DefaultError, User, true>(
        'User',
        'POST',
        `${endpoint}/user/upsert`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUpsertArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, User, Prisma.UserGetPayload<T>> | undefined,
                    DefaultError,
                    Prisma.SelectSubset<T, Prisma.UserUpsertArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, User, Prisma.UserGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteUser(
    options?: Omit<UseMutationOptions<User | undefined, DefaultError, Prisma.UserDeleteArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.UserDeleteArgs, DefaultError, User, true>(
        'User',
        'DELETE',
        `${endpoint}/user/delete`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, User, Prisma.UserGetPayload<T>> | undefined,
                    DefaultError,
                    Prisma.SelectSubset<T, Prisma.UserDeleteArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, User, Prisma.UserGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteManyUser(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.UserDeleteManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.UserDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>(
        'User',
        'DELETE',
        `${endpoint}/user/deleteMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserDeleteManyArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<T, Prisma.UserDeleteManyArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateUser<
    TArgs extends Prisma.UserAggregateArgs,
    TQueryFnData = Prisma.GetUserAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args: Prisma.SelectSubset<TArgs, Prisma.UserAggregateArgs>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('User', `${endpoint}/user/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateUser<
    TArgs extends Prisma.UserAggregateArgs,
    TQueryFnData = Prisma.GetUserAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args: Prisma.SelectSubset<TArgs, Prisma.UserAggregateArgs>,
    options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'User',
        `${endpoint}/user/aggregate`,
        args,
        options,
        fetch,
    );
}

export function useGroupByUser<
    TArgs extends Prisma.UserGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.UserGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.UserGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<TArgs['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False,
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
          : 'take' extends Prisma.Keys<TArgs>
            ? 'orderBy' extends Prisma.Keys<TArgs>
                ? ByValid extends Prisma.True
                    ? {}
                    : {
                          [P in OrderFields]: P extends ByFields
                              ? never
                              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                      }[OrderFields]
                : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Prisma.Keys<TArgs>
              ? 'orderBy' extends Prisma.Keys<TArgs>
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
    TQueryFnData = {} extends InputErrors
        ? Array<
              PickEnumerable<Prisma.UserGroupByOutputType, TArgs['by']> & {
                  [P in keyof TArgs & keyof Prisma.UserGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<TArgs[P], Prisma.UserGroupByOutputType[P]>
                      : Prisma.GetScalarType<TArgs[P], Prisma.UserGroupByOutputType[P]>;
              }
          >
        : InputErrors,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.SubsetIntersection<TArgs, Prisma.UserGroupByArgs, OrderByArg> & InputErrors
    >,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('User', `${endpoint}/user/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByUser<
    TArgs extends Prisma.UserGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.UserGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.UserGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<TArgs['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False,
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
          : 'take' extends Prisma.Keys<TArgs>
            ? 'orderBy' extends Prisma.Keys<TArgs>
                ? ByValid extends Prisma.True
                    ? {}
                    : {
                          [P in OrderFields]: P extends ByFields
                              ? never
                              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                      }[OrderFields]
                : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Prisma.Keys<TArgs>
              ? 'orderBy' extends Prisma.Keys<TArgs>
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
    TQueryFnData = {} extends InputErrors
        ? Array<
              PickEnumerable<Prisma.UserGroupByOutputType, TArgs['by']> & {
                  [P in keyof TArgs & keyof Prisma.UserGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<TArgs[P], Prisma.UserGroupByOutputType[P]>
                      : Prisma.GetScalarType<TArgs[P], Prisma.UserGroupByOutputType[P]>;
              }
          >
        : InputErrors,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.SubsetIntersection<TArgs, Prisma.UserGroupByArgs, OrderByArg> & InputErrors
    >,
    options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('User', `${endpoint}/user/groupBy`, args, options, fetch);
}

export function useCountUser<
    TArgs extends Prisma.UserCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<TArgs['select'], Prisma.UserCountAggregateOutputType>
        : number,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.UserCountArgs>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('User', `${endpoint}/user/count`, args, options, fetch);
}

export function useSuspenseCountUser<
    TArgs extends Prisma.UserCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<TArgs['select'], Prisma.UserCountAggregateOutputType>
        : number,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.UserCountArgs>,
    options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('User', `${endpoint}/user/count`, args, options, fetch);
}
