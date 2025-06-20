const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllIdeasRoute = () => '/'

export const viewIdeaRouteParams = getRouteParams({ id: true })
export type ViewIdeaRouteParams = typeof viewIdeaRouteParams
export const getViewIdeaRoute = ({ id }: ViewIdeaRouteParams) => `/ideas/${id}`

export const getNewIdeaRoute = () => '/ideas/new'
