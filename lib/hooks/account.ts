/* eslint-disable */
import type { Prisma, Account } from '@prisma/client';
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { RequestHandlerContext, getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect } from '@zenstackhq/tanstack-query/runtime-v5';
import metadata from './__model_meta';

export function useCreateAccount(
    options?: Omit<UseMutationOptions<Account | undefined, unknown, Prisma.AccountCreateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.AccountCreateArgs, Account, true>(
        'Account',
        'POST',
        `${endpoint}/account/create`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.AccountCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.AccountCreateArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, Account, Prisma.AccountGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.AccountCreateArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, Account, Prisma.AccountGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useCreateManyAccount(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.AccountCreateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.AccountCreateManyArgs, Prisma.BatchPayload, false>(
        'Account',
        'POST',
        `${endpoint}/account/createMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.AccountCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.AccountCreateManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.AccountCreateManyArgs>>,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyAccount<T extends Prisma.AccountFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.AccountFindManyArgs>,
    options?: Omit<UseQueryOptions<Array<Prisma.AccountGetPayload<T> & { $optimistic?: boolean }>>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('Account', `${endpoint}/account/findMany`, args, options, fetch, optimisticUpdate);
}

export function useInfiniteFindManyAccount<T extends Prisma.AccountFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.AccountFindManyArgs>,
    options?: Omit<
        UseInfiniteQueryOptions<
            Array<Prisma.AccountGetPayload<T>>,
            unknown,
            InfiniteData<Array<Prisma.AccountGetPayload<T>>>
        >,
        'queryKey'
    >,
) {
    options = options ?? { initialPageParam: undefined, getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery('Account', `${endpoint}/account/findMany`, args, options, fetch);
}

export function useFindUniqueAccount<T extends Prisma.AccountFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.AccountFindUniqueArgs>,
    options?: Omit<UseQueryOptions<Prisma.AccountGetPayload<T> & { $optimistic?: boolean }>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('Account', `${endpoint}/account/findUnique`, args, options, fetch, optimisticUpdate);
}

export function useFindFirstAccount<T extends Prisma.AccountFindFirstArgs>(
    args?: Prisma.SelectSubset<T, Prisma.AccountFindFirstArgs>,
    options?: Omit<UseQueryOptions<Prisma.AccountGetPayload<T> & { $optimistic?: boolean }>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('Account', `${endpoint}/account/findFirst`, args, options, fetch, optimisticUpdate);
}

export function useUpdateAccount(
    options?: Omit<UseMutationOptions<Account | undefined, unknown, Prisma.AccountUpdateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.AccountUpdateArgs, Account, true>(
        'Account',
        'PUT',
        `${endpoint}/account/update`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.AccountUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.AccountUpdateArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, Account, Prisma.AccountGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.AccountUpdateArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, Account, Prisma.AccountGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useUpdateManyAccount(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.AccountUpdateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.AccountUpdateManyArgs, Prisma.BatchPayload, false>(
        'Account',
        'PUT',
        `${endpoint}/account/updateMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.AccountUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.AccountUpdateManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.AccountUpdateManyArgs>>,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertAccount(
    options?: Omit<UseMutationOptions<Account | undefined, unknown, Prisma.AccountUpsertArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.AccountUpsertArgs, Account, true>(
        'Account',
        'POST',
        `${endpoint}/account/upsert`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.AccountUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.AccountUpsertArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, Account, Prisma.AccountGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.AccountUpsertArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, Account, Prisma.AccountGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteAccount(
    options?: Omit<UseMutationOptions<Account | undefined, unknown, Prisma.AccountDeleteArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.AccountDeleteArgs, Account, true>(
        'Account',
        'DELETE',
        `${endpoint}/account/delete`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.AccountDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.AccountDeleteArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, Account, Prisma.AccountGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.AccountDeleteArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, Account, Prisma.AccountGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteManyAccount(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.AccountDeleteManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.AccountDeleteManyArgs, Prisma.BatchPayload, false>(
        'Account',
        'DELETE',
        `${endpoint}/account/deleteMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.AccountDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.AccountDeleteManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.AccountDeleteManyArgs>>,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateAccount<T extends Prisma.AccountAggregateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AccountAggregateArgs>,
    options?: Omit<UseQueryOptions<Prisma.GetAccountAggregateType<T>>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('Account', `${endpoint}/account/aggregate`, args, options, fetch);
}

export function useGroupByAccount<
    T extends Prisma.AccountGroupByArgs,
    HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.AccountGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.AccountGroupByArgs['orderBy'] },
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
    args: Prisma.SelectSubset<T, Prisma.SubsetIntersection<T, Prisma.AccountGroupByArgs, OrderByArg> & InputErrors>,
    options?: Omit<
        UseQueryOptions<
            {} extends InputErrors
                ? Array<
                      PickEnumerable<Prisma.AccountGroupByOutputType, T['by']> & {
                          [P in keyof T & keyof Prisma.AccountGroupByOutputType]: P extends '_count'
                              ? T[P] extends boolean
                                  ? number
                                  : Prisma.GetScalarType<T[P], Prisma.AccountGroupByOutputType[P]>
                              : Prisma.GetScalarType<T[P], Prisma.AccountGroupByOutputType[P]>;
                      }
                  >
                : InputErrors
        >,
        'queryKey'
    >,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('Account', `${endpoint}/account/groupBy`, args, options, fetch);
}

export function useCountAccount<T extends Prisma.AccountCountArgs>(
    args?: Prisma.SelectSubset<T, Prisma.AccountCountArgs>,
    options?: Omit<
        UseQueryOptions<
            T extends { select: any }
                ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.AccountCountAggregateOutputType>
                : number
        >,
        'queryKey'
    >,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('Account', `${endpoint}/account/count`, args, options, fetch);
}
