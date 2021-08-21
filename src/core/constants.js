export const ROUTER_PATHS = {
  meetups: "/meetups",
  meetup_details: "/meetups/:id",
  admin_meetups: "/admin",
  admin_meetups_create: "/admin/nueva",
  admin_meetups_edit: "/admin/modificar-:id",
  admin_meetups_delete: "/admin/borrar-:id",
  admin_meetups_details: "/admin/details-:id",
};

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOW: undefined,
};

export const MEETUPS_LOADING = null;

export const DOC_STATES = {
  NOT_EXISTS: null,
  LOADING: undefined,
};

export const ADMIN_STATES = {
  NOT_KNOW: undefined,
  NOT_LOGGED: null,
};
