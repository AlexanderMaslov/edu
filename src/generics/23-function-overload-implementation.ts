interface AnonymousPrivileges {
  sitesCanVisit: string[];
}

interface UserPrivileges extends AnonymousPrivileges {
  sitesCanEdit: string[];
}

interface AdminPrivileges extends UserPrivileges {
  sitesCanDelete: string[];
}

function getRolePrivileges(role: 'admin'): AdminPrivileges;
function getRolePrivileges(role: 'user'): UserPrivileges;
function getRolePrivileges(role: string): AnonymousPrivileges;
function getRolePrivileges(
  role: 'admin' | 'user' | string,
): AnonymousPrivileges | UserPrivileges | AdminPrivileges {
  switch (role) {
    case 'admin':
      return {
        sitesCanDelete: [],
        sitesCanEdit: [],
        sitesCanVisit: [],
      };
    case 'user':
      return {
        sitesCanEdit: [],
        sitesCanVisit: [],
      };
    default:
      return { sitesCanVisit: [] };
  }
}

const res = getRolePrivileges('anonymous');
