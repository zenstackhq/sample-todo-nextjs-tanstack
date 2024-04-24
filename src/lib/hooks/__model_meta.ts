/* eslint-disable */
const metadata = {
    models: {
        space: {
            name: 'Space', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                }, slug: {
                    name: "slug",
                    type: "String",
                }, members: {
                    name: "members",
                    type: "SpaceUser",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'space',
                }, lists: {
                    name: "lists",
                    type: "List",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'space',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, slug: {
                    name: "slug",
                    fields: ["slug"]
                },
            }
            ,
        }
        ,
        spaceUser: {
            name: 'SpaceUser', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, space: {
                    name: "space",
                    type: "Space",
                    isDataModel: true,
                    backLink: 'members',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "spaceId" },
                }, spaceId: {
                    name: "spaceId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'space',
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'spaces',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                }, userId: {
                    name: "userId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, role: {
                    name: "role",
                    type: "SpaceUserRole",
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, userId_spaceId: {
                    name: "userId_spaceId",
                    fields: ["userId", "spaceId"]
                },
            }
            ,
        }
        ,
        user: {
            name: 'User', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, email: {
                    name: "email",
                    type: "String",
                }, emailVerified: {
                    name: "emailVerified",
                    type: "DateTime",
                    isOptional: true,
                }, password: {
                    name: "password",
                    type: "String",
                    isOptional: true,
                }, name: {
                    name: "name",
                    type: "String",
                    isOptional: true,
                }, spaces: {
                    name: "spaces",
                    type: "SpaceUser",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, image: {
                    name: "image",
                    type: "String",
                    isOptional: true,
                }, lists: {
                    name: "lists",
                    type: "List",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'owner',
                }, todos: {
                    name: "todos",
                    type: "Todo",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'owner',
                }, accounts: {
                    name: "accounts",
                    type: "Account",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, email: {
                    name: "email",
                    fields: ["email"]
                },
            }
            ,
        }
        ,
        list: {
            name: 'List', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, space: {
                    name: "space",
                    type: "Space",
                    isDataModel: true,
                    backLink: 'lists',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "spaceId" },
                }, spaceId: {
                    name: "spaceId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'space',
                }, owner: {
                    name: "owner",
                    type: "User",
                    isDataModel: true,
                    backLink: 'lists',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "ownerId" },
                }, ownerId: {
                    name: "ownerId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'owner',
                }, title: {
                    name: "title",
                    type: "String",
                }, private: {
                    name: "private",
                    type: "Boolean",
                    attributes: [{ "name": "@default", "args": [{ "value": false }] }],
                }, todos: {
                    name: "todos",
                    type: "Todo",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'list',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        todo: {
            name: 'Todo', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, owner: {
                    name: "owner",
                    type: "User",
                    isDataModel: true,
                    backLink: 'todos',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "ownerId" },
                }, ownerId: {
                    name: "ownerId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'owner',
                }, list: {
                    name: "list",
                    type: "List",
                    isDataModel: true,
                    backLink: 'todos',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "listId" },
                }, listId: {
                    name: "listId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'list',
                }, title: {
                    name: "title",
                    type: "String",
                }, completedAt: {
                    name: "completedAt",
                    type: "DateTime",
                    isOptional: true,
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        account: {
            name: 'Account', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, userId: {
                    name: "userId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, type: {
                    name: "type",
                    type: "String",
                }, provider: {
                    name: "provider",
                    type: "String",
                }, providerAccountId: {
                    name: "providerAccountId",
                    type: "String",
                }, refresh_token: {
                    name: "refresh_token",
                    type: "String",
                    isOptional: true,
                }, refresh_token_expires_in: {
                    name: "refresh_token_expires_in",
                    type: "Int",
                    isOptional: true,
                }, access_token: {
                    name: "access_token",
                    type: "String",
                    isOptional: true,
                }, expires_at: {
                    name: "expires_at",
                    type: "Int",
                    isOptional: true,
                }, token_type: {
                    name: "token_type",
                    type: "String",
                    isOptional: true,
                }, scope: {
                    name: "scope",
                    type: "String",
                    isOptional: true,
                }, id_token: {
                    name: "id_token",
                    type: "String",
                    isOptional: true,
                }, session_state: {
                    name: "session_state",
                    type: "String",
                    isOptional: true,
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'accounts',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, provider_providerAccountId: {
                    name: "provider_providerAccountId",
                    fields: ["provider", "providerAccountId"]
                },
            }
            ,
        }
        ,
    }
    ,
    deleteCascade: {
        space: ['SpaceUser', 'List'],
        user: ['SpaceUser', 'List', 'Todo', 'Account'],
        list: ['Todo'],
    }
    ,
    authModel: 'User'
};
export default metadata;
