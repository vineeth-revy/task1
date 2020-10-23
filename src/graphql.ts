
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Access {
    Create = "Create",
    Delete = "Delete",
    Update = "Update",
    Read = "Read"
}

export interface RoleInput {
    code: string;
    description: string;
    permission: PermissionInput[];
}

export interface PermissionInput {
    moduleId: number;
    access: Access[];
}

export interface IQuery {
    allRoles(limit?: number, offset?: number): Roles[] | Promise<Roles[]>;
    findOne(id: string): Roles | Promise<Roles>;
}

export interface IMutation {
    createRole(role: RoleInput): Roles | Promise<Roles>;
}

export interface Roles {
    id: string;
    roleId: string;
    code: string;
    description: string;
    permission: string[];
}
