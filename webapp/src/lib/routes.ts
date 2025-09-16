const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllIdeasRoute = () => '/'

export const viewIdeaRouteParams = getRouteParams({ nick: true })
export type ViewIdeaRouteParams = typeof viewIdeaRouteParams
export const getViewIdeaRoute = ({ nick }: ViewIdeaRouteParams) => `/ideas/${nick}`

export const editIdeaRouteParams = getRouteParams({ nick: true })
export type EditIdeaRouteParams = typeof viewIdeaRouteParams
export const getEditIdeaRoute = ({ nick }: EditIdeaRouteParams) => `/ideas/${nick}/edit`

export const getNewIdeaRoute = () => '/ideas/new'

export const editProfileRoute = () => '/edit-profile'

export const getSignupRoute = () => '/signup'
export const getLoginRoute = () => '/login'
export const getLogoutRoute = () => '/logout'
