/* eslint-disable */
import type { Prisma, SpaceUser } from '@prisma/client';
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { RequestHandlerContext, getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect } from '@zenstackhq/tanstack-query/runtime-v5';
import metadata from './__model_meta';

export function useCreateSpaceUser(
    options?: Omit<UseMutationOptions<SpaceUser | undefined, unknown, Prisma.SpaceUserCreateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceUserCreateArgs, SpaceUser, true>(
        'SpaceUser',
        'POST',
        `${endpoint}/spaceUser/create`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.SpaceUserCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUserCreateArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, SpaceUser, Prisma.SpaceUserGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceUserCreateArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, SpaceUser, Prisma.SpaceUserGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useCreateManySpaceUser(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SpaceUserCreateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceUserCreateManyArgs, Prisma.BatchPayload, false>(
        'SpaceUser',
        'POST',
        `${endpoint}/spaceUser/createMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.SpaceUserCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUserCreateManyArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceUserCreateManyArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManySpaceUser<T extends Prisma.SpaceUserFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.SpaceUserFindManyArgs>,
    options?: Omit<UseQueryOptions<Array<Prisma.SpaceUserGetPayload<T> & { $optimistic?: boolean }>>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('SpaceUser', `${endpoint}/spaceUser/findMany`, args, options, fetch, optimisticUpdate);
}

export function useInfiniteFindManySpaceUser<T extends Prisma.SpaceUserFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.SpaceUserFindManyArgs>,
    options?: Omit<
        UseInfiniteQueryOptions<
            Array<Prisma.SpaceUserGetPayload<T>>,
            unknown,
            InfiniteData<Array<Prisma.SpaceUserGetPayload<T>>>
        >,
        'queryKey'
    >,
) {
    options = options ?? { initialPageParam: undefined, getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery('SpaceUser', `${endpoint}/spaceUser/findMany`, args, options, fetch);
}

export function useFindUniqueSpaceUser<T extends Prisma.SpaceUserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SpaceUserFindUniqueArgs>,
    options?: Omit<UseQueryOptions<Prisma.SpaceUserGetPayload<T> & { $optimistic?: boolean }>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('SpaceUser', `${endpoint}/spaceUser/findUnique`, args, options, fetch, optimisticUpdate);
}

export function useFindFirstSpaceUser<T extends Prisma.SpaceUserFindFirstArgs>(
    args?: Prisma.SelectSubset<T, Prisma.SpaceUserFindFirstArgs>,
    options?: Omit<UseQueryOptions<Prisma.SpaceUserGetPayload<T> & { $optimistic?: boolean }>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('SpaceUser', `${endpoint}/spaceUser/findFirst`, args, options, fetch, optimisticUpdate);
}

export function useUpdateSpaceUser(
    options?: Omit<UseMutationOptions<SpaceUser | undefined, unknown, Prisma.SpaceUserUpdateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceUserUpdateArgs, SpaceUser, true>(
        'SpaceUser',
        'PUT',
        `${endpoint}/spaceUser/update`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.SpaceUserUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUserUpdateArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, SpaceUser, Prisma.SpaceUserGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceUserUpdateArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, SpaceUser, Prisma.SpaceUserGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useUpdateManySpaceUser(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SpaceUserUpdateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceUserUpdateManyArgs, Prisma.BatchPayload, false>(
        'SpaceUser',
        'PUT',
        `${endpoint}/spaceUser/updateMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.SpaceUserUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUserUpdateManyArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceUserUpdateManyArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertSpaceUser(
    options?: Omit<UseMutationOptions<SpaceUser | undefined, unknown, Prisma.SpaceUserUpsertArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceUserUpsertArgs, SpaceUser, true>(
        'SpaceUser',
        'POST',
        `${endpoint}/spaceUser/upsert`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.SpaceUserUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUserUpsertArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, SpaceUser, Prisma.SpaceUserGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceUserUpsertArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, SpaceUser, Prisma.SpaceUserGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteSpaceUser(
    options?: Omit<UseMutationOptions<SpaceUser | undefined, unknown, Prisma.SpaceUserDeleteArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceUserDeleteArgs, SpaceUser, true>(
        'SpaceUser',
        'DELETE',
        `${endpoint}/spaceUser/delete`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.SpaceUserDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUserDeleteArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, SpaceUser, Prisma.SpaceUserGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceUserDeleteArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, SpaceUser, Prisma.SpaceUserGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteManySpaceUser(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SpaceUserDeleteManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceUserDeleteManyArgs, Prisma.BatchPayload, false>(
        'SpaceUser',
        'DELETE',
        `${endpoint}/spaceUser/deleteMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.SpaceUserDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUserDeleteManyArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceUserDeleteManyArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateSpaceUser<T extends Prisma.SpaceUserAggregateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SpaceUserAggregateArgs>,
    options?: Omit<UseQueryOptions<Prisma.GetSpaceUserAggregateType<T>>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('SpaceUser', `${endpoint}/spaceUser/aggregate`, args, options, fetch);
}

export function useGroupBySpaceUser<
    T extends Prisma.SpaceUserGroupByArgs,
    HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.SpaceUserGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.SpaceUserGroupByArgs['orderBy'] },
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
    args: Prisma.SelectSubset<T, Prisma.SubsetIntersection<T, Prisma.SpaceUserGroupByArgs, OrderByArg> & InputErrors>,
    options?: Omit<
        UseQueryOptions<
            {} extends InputErrors
                ? Array<
                      PickEnumerable<Prisma.SpaceUserGroupByOutputType, T['by']> & {
                          [P in keyof T & keyof Prisma.SpaceUserGroupByOutputType]: P extends '_count'
                              ? T[P] extends boolean
                                  ? number
                                  : Prisma.GetScalarType<T[P], Prisma.SpaceUserGroupByOutputType[P]>
                              : Prisma.GetScalarType<T[P], Prisma.SpaceUserGroupByOutputType[P]>;
                      }
                  >
                : InputErrors
        >,
        'queryKey'
    >,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('SpaceUser', `${endpoint}/spaceUser/groupBy`, args, options, fetch);
}

export function useCountSpaceUser<T extends Prisma.SpaceUserCountArgs>(
    args?: Prisma.SelectSubset<T, Prisma.SpaceUserCountArgs>,
    options?: Omit<
        UseQueryOptions<
            T extends { select: any }
                ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.SpaceUserCountAggregateOutputType>
                : number
        >,
        'queryKey'
    >,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('SpaceUser', `${endpoint}/spaceUser/count`, args, options, fetch);
}
