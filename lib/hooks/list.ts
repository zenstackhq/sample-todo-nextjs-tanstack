/* eslint-disable */
import type { Prisma, List } from '@prisma/client';
import { useContext } from 'react';
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { RequestHandlerContext } from './_helper';
import { query, postMutation, putMutation, deleteMutation } from './_helper';

export function useCreateList(
    options?: Omit<UseMutationOptions<List, unknown, Prisma.ListCreateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    const _mutation = postMutation<Prisma.ListCreateArgs, List>(
        'List',
        `${endpoint}/list/create`,
        options,
        invalidateQueries,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.ListCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.ListCreateArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.CheckSelect<T, List, Prisma.ListGetPayload<T>>,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.ListCreateArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.CheckSelect<
                T,
                List,
                Prisma.ListGetPayload<T>
            >;
        },
    };
    return mutation;
}

export function useCreateManyList(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.ListCreateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    const _mutation = postMutation<Prisma.ListCreateManyArgs, Prisma.BatchPayload>(
        'List',
        `${endpoint}/list/createMany`,
        options,
        invalidateQueries,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.ListCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ListCreateManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.ListCreateManyArgs>>,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyList<T extends Prisma.ListFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.ListFindManyArgs>,
    options?: UseQueryOptions<Array<Prisma.ListGetPayload<T>>>,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    return query<Array<Prisma.ListGetPayload<T>>>('List', `${endpoint}/list/findMany`, args, options);
}

export function useFindUniqueList<T extends Prisma.ListFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListFindUniqueArgs>,
    options?: UseQueryOptions<Prisma.ListGetPayload<T>>,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    return query<Prisma.ListGetPayload<T>>('List', `${endpoint}/list/findUnique`, args, options);
}

export function useFindFirstList<T extends Prisma.ListFindFirstArgs>(
    args?: Prisma.SelectSubset<T, Prisma.ListFindFirstArgs>,
    options?: UseQueryOptions<Prisma.ListGetPayload<T>>,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    return query<Prisma.ListGetPayload<T>>('List', `${endpoint}/list/findFirst`, args, options);
}

export function useUpdateList(
    options?: Omit<UseMutationOptions<List, unknown, Prisma.ListUpdateArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    const _mutation = putMutation<Prisma.ListUpdateArgs, List>(
        'List',
        `${endpoint}/list/update`,
        options,
        invalidateQueries,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.ListUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.ListUpdateArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.CheckSelect<T, List, Prisma.ListGetPayload<T>>,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.ListUpdateArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.CheckSelect<
                T,
                List,
                Prisma.ListGetPayload<T>
            >;
        },
    };
    return mutation;
}

export function useUpdateManyList(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.ListUpdateManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    const _mutation = putMutation<Prisma.ListUpdateManyArgs, Prisma.BatchPayload>(
        'List',
        `${endpoint}/list/updateMany`,
        options,
        invalidateQueries,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.ListUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ListUpdateManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.ListUpdateManyArgs>>,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertList(
    options?: Omit<UseMutationOptions<List, unknown, Prisma.ListUpsertArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    const _mutation = postMutation<Prisma.ListUpsertArgs, List>(
        'List',
        `${endpoint}/list/upsert`,
        options,
        invalidateQueries,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.ListUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.ListUpsertArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.CheckSelect<T, List, Prisma.ListGetPayload<T>>,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.ListUpsertArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.CheckSelect<
                T,
                List,
                Prisma.ListGetPayload<T>
            >;
        },
    };
    return mutation;
}

export function useDeleteList(
    options?: Omit<UseMutationOptions<List, unknown, Prisma.ListDeleteArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    const _mutation = deleteMutation<Prisma.ListDeleteArgs, List>(
        'List',
        `${endpoint}/list/delete`,
        options,
        invalidateQueries,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.ListDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.ListDeleteArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.CheckSelect<T, List, Prisma.ListGetPayload<T>>,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.ListDeleteArgs>
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.CheckSelect<
                T,
                List,
                Prisma.ListGetPayload<T>
            >;
        },
    };
    return mutation;
}

export function useDeleteManyList(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.ListDeleteManyArgs>, 'mutationFn'>,
    invalidateQueries: boolean = true,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    const _mutation = deleteMutation<Prisma.ListDeleteManyArgs, Prisma.BatchPayload>(
        'List',
        `${endpoint}/list/deleteMany`,
        options,
        invalidateQueries,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.ListDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ListDeleteManyArgs>,
            options?: Omit<
                UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SelectSubset<T, Prisma.ListDeleteManyArgs>>,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateList<T extends Prisma.ListAggregateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListAggregateArgs>,
    options?: UseQueryOptions<Prisma.GetListAggregateType<T>>,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    return query<Prisma.GetListAggregateType<T>>('List', `${endpoint}/list/aggregate`, args, options);
}

export function useGroupByList<
    T extends Prisma.ListGroupByArgs,
    HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.ListGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.ListGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.TupleToUnion<T['by']>,
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
    args: Prisma.SelectSubset<T, Prisma.SubsetIntersection<T, Prisma.ListGroupByArgs, OrderByArg> & InputErrors>,
    options?: UseQueryOptions<
        {} extends InputErrors
            ? Array<
                  Prisma.PickArray<Prisma.ListGroupByOutputType, T['by']> & {
                      [P in keyof T & keyof Prisma.ListGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<T[P], Prisma.ListGroupByOutputType[P]>
                          : Prisma.GetScalarType<T[P], Prisma.ListGroupByOutputType[P]>;
                  }
              >
            : InputErrors
    >,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    return query<
        {} extends InputErrors
            ? Array<
                  Prisma.PickArray<Prisma.ListGroupByOutputType, T['by']> & {
                      [P in keyof T & keyof Prisma.ListGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<T[P], Prisma.ListGroupByOutputType[P]>
                          : Prisma.GetScalarType<T[P], Prisma.ListGroupByOutputType[P]>;
                  }
              >
            : InputErrors
    >('List', `${endpoint}/list/groupBy`, args, options);
}

export function useCountList<T extends Prisma.ListCountArgs>(
    args?: Prisma.SelectSubset<T, Prisma.ListCountArgs>,
    options?: UseQueryOptions<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ListCountAggregateOutputType>
            : number
    >,
) {
    const { endpoint } = useContext(RequestHandlerContext);
    return query<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ListCountAggregateOutputType>
            : number
    >('List', `${endpoint}/list/count`, args, options);
}
