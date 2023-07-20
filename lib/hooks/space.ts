/* eslint-disable */
import type { Prisma, Space } from '@prisma/client';
import { useContext } from 'react';
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { RequestHandlerContext } from '@zenstackhq/tanstack-query/runtime/react';
import { query, postMutation, putMutation, deleteMutation } from '@zenstackhq/tanstack-query/runtime/react';
import type { PickEnumerable } from '@zenstackhq/tanstack-query/runtime';

export function useCreateSpace(
    options?: Omit<UseMutationOptions<Space | undefined, unknown, Prisma.SpaceCreateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = postMutation<Prisma.SpaceCreateArgs, Space, true>(
        'Space',
        `${endpoint}/space/create`,
        options,
        fetch,
        invalidateQueries,
        true,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceCreateArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.CheckSelect<T, Space, Prisma.SpaceGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceCreateArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | Prisma.CheckSelect<T, Space, Prisma.SpaceGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useCreateManySpace(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SpaceCreateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = postMutation<Prisma.SpaceCreateManyArgs, Prisma.BatchPayload, false>(
        'Space',
        `${endpoint}/space/createMany`,
        options,
        fetch,
        invalidateQueries,
        false,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceCreateManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.SpaceCreateManyArgs>>,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManySpace<T extends Prisma.SpaceFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.SpaceFindManyArgs>,
    options?: UseQueryOptions<Array<Prisma.SpaceGetPayload<T>>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return query<Array<Prisma.SpaceGetPayload<T>>>('Space', `${endpoint}/space/findMany`, args, options, fetch);
}

export function useFindUniqueSpace<T extends Prisma.SpaceFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SpaceFindUniqueArgs>,
    options?: UseQueryOptions<Prisma.SpaceGetPayload<T>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return query<Prisma.SpaceGetPayload<T>>('Space', `${endpoint}/space/findUnique`, args, options, fetch);
}

export function useFindFirstSpace<T extends Prisma.SpaceFindFirstArgs>(
    args?: Prisma.SelectSubset<T, Prisma.SpaceFindFirstArgs>,
    options?: UseQueryOptions<Prisma.SpaceGetPayload<T>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return query<Prisma.SpaceGetPayload<T>>('Space', `${endpoint}/space/findFirst`, args, options, fetch);
}

export function useUpdateSpace(
    options?: Omit<UseMutationOptions<Space | undefined, unknown, Prisma.SpaceUpdateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = putMutation<Prisma.SpaceUpdateArgs, Space, true>(
        'Space',
        `${endpoint}/space/update`,
        options,
        fetch,
        invalidateQueries,
        true,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUpdateArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.CheckSelect<T, Space, Prisma.SpaceGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceUpdateArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | Prisma.CheckSelect<T, Space, Prisma.SpaceGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useUpdateManySpace(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SpaceUpdateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = putMutation<Prisma.SpaceUpdateManyArgs, Prisma.BatchPayload, false>(
        'Space',
        `${endpoint}/space/updateMany`,
        options,
        fetch,
        invalidateQueries,
        false,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUpdateManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.SpaceUpdateManyArgs>>,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertSpace(
    options?: Omit<UseMutationOptions<Space | undefined, unknown, Prisma.SpaceUpsertArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = postMutation<Prisma.SpaceUpsertArgs, Space, true>(
        'Space',
        `${endpoint}/space/upsert`,
        options,
        fetch,
        invalidateQueries,
        true,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUpsertArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.CheckSelect<T, Space, Prisma.SpaceGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceUpsertArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | Prisma.CheckSelect<T, Space, Prisma.SpaceGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteSpace(
    options?: Omit<UseMutationOptions<Space | undefined, unknown, Prisma.SpaceDeleteArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = deleteMutation<Prisma.SpaceDeleteArgs, Space, true>(
        'Space',
        `${endpoint}/space/delete`,
        options,
        fetch,
        invalidateQueries,
        true,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceDeleteArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.CheckSelect<T, Space, Prisma.SpaceGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceDeleteArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | Prisma.CheckSelect<T, Space, Prisma.SpaceGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteManySpace(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SpaceDeleteManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const _mutation = deleteMutation<Prisma.SpaceDeleteManyArgs, Prisma.BatchPayload, false>(
        'Space',
        `${endpoint}/space/deleteMany`,
        options,
        fetch,
        invalidateQueries,
        false,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceDeleteManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.SpaceDeleteManyArgs>>,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateSpace<T extends Prisma.SpaceAggregateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SpaceAggregateArgs>,
    options?: UseQueryOptions<Prisma.GetSpaceAggregateType<T>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return query<Prisma.GetSpaceAggregateType<T>>('Space', `${endpoint}/space/aggregate`, args, options, fetch);
}

export function useGroupBySpace<
    T extends Prisma.SpaceGroupByArgs,
    HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.SpaceGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.SpaceGroupByArgs['orderBy'] },
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
    args: Prisma.SelectSubset<T, Prisma.SubsetIntersection<T, Prisma.SpaceGroupByArgs, OrderByArg> & InputErrors>,
    options?: UseQueryOptions<
        {} extends InputErrors
            ? Array<
                  PickEnumerable<Prisma.SpaceGroupByOutputType, T['by']> & {
                      [P in keyof T & keyof Prisma.SpaceGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<T[P], Prisma.SpaceGroupByOutputType[P]>
                          : Prisma.GetScalarType<T[P], Prisma.SpaceGroupByOutputType[P]>;
                  }
              >
            : InputErrors
    >,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return query<
        {} extends InputErrors
            ? Array<
                  PickEnumerable<Prisma.SpaceGroupByOutputType, T['by']> & {
                      [P in keyof T & keyof Prisma.SpaceGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<T[P], Prisma.SpaceGroupByOutputType[P]>
                          : Prisma.GetScalarType<T[P], Prisma.SpaceGroupByOutputType[P]>;
                  }
              >
            : InputErrors
    >('Space', `${endpoint}/space/groupBy`, args, options, fetch);
}

export function useCountSpace<T extends Prisma.SpaceCountArgs>(
    args?: Prisma.SelectSubset<T, Prisma.SpaceCountArgs>,
    options?: UseQueryOptions<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.SpaceCountAggregateOutputType>
            : number
    >,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return query<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.SpaceCountAggregateOutputType>
            : number
    >('Space', `${endpoint}/space/count`, args, options, fetch);
}
