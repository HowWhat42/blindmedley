import User from '#models/user'

import usePageProps from './use_page_props'

export default function useUser() {
  const { user } = usePageProps<{ user: User }>()
  return user
}
