/* eslint-disable */
import type { Prisma, Todo } from '@prisma/client';
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect } from '@zenstackhq/tanstack-query/runtime-v5';
import metadata from './__model_meta';
type DefaultError = Error;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateTodo(
    options?: Omit<UseMutationOptions<Todo | undefined, unknown, Prisma.TodoCreateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.TodoCreateArgs, Todo, true>(
        'Todo',
        'POST',
        `${endpoint}/todo/create`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TodoCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.TodoCreateArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, Todo, Prisma.TodoGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.TodoCreateArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, Todo, Prisma.TodoGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useCreateManyTodo(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.TodoCreateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.TodoCreateManyArgs, Prisma.BatchPayload, false>(
        'Todo',
        'POST',
        `${endpoint}/todo/createMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TodoCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.TodoCreateManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.TodoCreateManyArgs>>,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyTodo<
    TArgs extends Prisma.TodoFindManyArgs,
    TQueryFnData = Array<Prisma.TodoGetPayload<TArgs> & { $optimistic?: boolean }>,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.TodoFindManyArgs>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>(
        'Todo',
        `${endpoint}/todo/findMany`,
        args,
        options,
        fetch,
        optimisticUpdate,
    );
}

export function useInfiniteFindManyTodo<
    TArgs extends Prisma.TodoFindManyArgs,
    TQueryFnData = Array<Prisma.TodoGetPayload<TArgs>>,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.TodoFindManyArgs>,
    options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey'>,
) {
    options = options ?? { initialPageParam: undefined, getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>(
        'Todo',
        `${endpoint}/todo/findMany`,
        args,
        options,
        fetch,
    );
}

export function useSuspenseFindManyTodo<
    TArgs extends Prisma.TodoFindManyArgs,
    TQueryFnData = Array<Prisma.TodoGetPayload<TArgs> & { $optimistic?: boolean }>,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.TodoFindManyArgs>,
    options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'Todo',
        `${endpoint}/todo/findMany`,
        args,
        options,
        fetch,
        optimisticUpdate,
    );
}

export function useSuspenseInfiniteFindManyTodo<
    TArgs extends Prisma.TodoFindManyArgs,
    TQueryFnData = Array<Prisma.TodoGetPayload<TArgs>>,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.TodoFindManyArgs>,
    options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey'>,
) {
    options = options ?? { initialPageParam: undefined, getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>(
        'Todo',
        `${endpoint}/todo/findMany`,
        args,
        options,
        fetch,
    );
}

export function useFindUniqueTodo<
    TArgs extends Prisma.TodoFindUniqueArgs,
    TQueryFnData = Prisma.TodoGetPayload<TArgs> & { $optimistic?: boolean },
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args: Prisma.SelectSubset<TArgs, Prisma.TodoFindUniqueArgs>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>(
        'Todo',
        `${endpoint}/todo/findUnique`,
        args,
        options,
        fetch,
        optimisticUpdate,
    );
}

export function useSuspenseFindUniqueTodo<
    TArgs extends Prisma.TodoFindUniqueArgs,
    TQueryFnData = Prisma.TodoGetPayload<TArgs> & { $optimistic?: boolean },
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args: Prisma.SelectSubset<TArgs, Prisma.TodoFindUniqueArgs>,
    options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'Todo',
        `${endpoint}/todo/findUnique`,
        args,
        options,
        fetch,
        optimisticUpdate,
    );
}

export function useFindFirstTodo<
    TArgs extends Prisma.TodoFindFirstArgs,
    TQueryFnData = Prisma.TodoGetPayload<TArgs> & { $optimistic?: boolean },
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.TodoFindFirstArgs>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>(
        'Todo',
        `${endpoint}/todo/findFirst`,
        args,
        options,
        fetch,
        optimisticUpdate,
    );
}

export function useSuspenseFindFirstTodo<
    TArgs extends Prisma.TodoFindFirstArgs,
    TQueryFnData = Prisma.TodoGetPayload<TArgs> & { $optimistic?: boolean },
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.TodoFindFirstArgs>,
    options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'Todo',
        `${endpoint}/todo/findFirst`,
        args,
        options,
        fetch,
        optimisticUpdate,
    );
}

export function useUpdateTodo(
    options?: Omit<UseMutationOptions<Todo | undefined, unknown, Prisma.TodoUpdateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.TodoUpdateArgs, Todo, true>(
        'Todo',
        'PUT',
        `${endpoint}/todo/update`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TodoUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.TodoUpdateArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, Todo, Prisma.TodoGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.TodoUpdateArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, Todo, Prisma.TodoGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useUpdateManyTodo(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.TodoUpdateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.TodoUpdateManyArgs, Prisma.BatchPayload, false>(
        'Todo',
        'PUT',
        `${endpoint}/todo/updateMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TodoUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.TodoUpdateManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.TodoUpdateManyArgs>>,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertTodo(
    options?: Omit<UseMutationOptions<Todo | undefined, unknown, Prisma.TodoUpsertArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.TodoUpsertArgs, Todo, true>(
        'Todo',
        'POST',
        `${endpoint}/todo/upsert`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TodoUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.TodoUpsertArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, Todo, Prisma.TodoGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.TodoUpsertArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, Todo, Prisma.TodoGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteTodo(
    options?: Omit<UseMutationOptions<Todo | undefined, unknown, Prisma.TodoDeleteArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.TodoDeleteArgs, Todo, true>(
        'Todo',
        'DELETE',
        `${endpoint}/todo/delete`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TodoDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.TodoDeleteArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, Todo, Prisma.TodoGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.TodoDeleteArgs>
                >,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, Todo, Prisma.TodoGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteManyTodo(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.TodoDeleteManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.TodoDeleteManyArgs, Prisma.BatchPayload, false>(
        'Todo',
        'DELETE',
        `${endpoint}/todo/deleteMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TodoDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.TodoDeleteManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.TodoDeleteManyArgs>>,
                'mutationFn'
            >,
        ) => {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateTodo<
    TArgs extends Prisma.TodoAggregateArgs,
    TQueryFnData = Prisma.GetTodoAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args: Prisma.SelectSubset<TArgs, Prisma.TodoAggregateArgs>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Todo', `${endpoint}/todo/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateTodo<
    TArgs extends Prisma.TodoAggregateArgs,
    TQueryFnData = Prisma.GetTodoAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args: Prisma.SelectSubset<TArgs, Prisma.TodoAggregateArgs>,
    options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'Todo',
        `${endpoint}/todo/aggregate`,
        args,
        options,
        fetch,
    );
}

export function useGroupByTodo<
    TArgs extends Prisma.TodoGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.TodoGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.TodoGroupByArgs['orderBy'] },
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
              PickEnumerable<Prisma.TodoGroupByOutputType, TArgs['by']> & {
                  [P in keyof TArgs & keyof Prisma.TodoGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<TArgs[P], Prisma.TodoGroupByOutputType[P]>
                      : Prisma.GetScalarType<TArgs[P], Prisma.TodoGroupByOutputType[P]>;
              }
          >
        : InputErrors,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.SubsetIntersection<TArgs, Prisma.TodoGroupByArgs, OrderByArg> & InputErrors
    >,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Todo', `${endpoint}/todo/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByTodo<
    TArgs extends Prisma.TodoGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.TodoGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.TodoGroupByArgs['orderBy'] },
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
              PickEnumerable<Prisma.TodoGroupByOutputType, TArgs['by']> & {
                  [P in keyof TArgs & keyof Prisma.TodoGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<TArgs[P], Prisma.TodoGroupByOutputType[P]>
                      : Prisma.GetScalarType<TArgs[P], Prisma.TodoGroupByOutputType[P]>;
              }
          >
        : InputErrors,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.SubsetIntersection<TArgs, Prisma.TodoGroupByArgs, OrderByArg> & InputErrors
    >,
    options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Todo', `${endpoint}/todo/groupBy`, args, options, fetch);
}

export function useCountTodo<
    TArgs extends Prisma.TodoCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<TArgs['select'], Prisma.TodoCountAggregateOutputType>
        : number,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.TodoCountArgs>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Todo', `${endpoint}/todo/count`, args, options, fetch);
}

export function useSuspenseCountTodo<
    TArgs extends Prisma.TodoCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<TArgs['select'], Prisma.TodoCountAggregateOutputType>
        : number,
    TData = TQueryFnData,
    TError = DefaultError,
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.TodoCountArgs>,
    options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Todo', `${endpoint}/todo/count`, args, options, fetch);
}
