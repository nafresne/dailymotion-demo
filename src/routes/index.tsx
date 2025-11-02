import { createFileRoute } from '@tanstack/react-router'

type IndexSearch = {
  channel?: string
}

export const Route = createFileRoute('/')({
  component: Index,
  validateSearch: (search: Record<string, unknown>): IndexSearch => {
    return {
        channel: (search.channel as string) || ''
    }
  }
})

function Index() {
    const { channel } = Route.useSearch()    

    return (
        <div className="p-2">
        <h3>Welcome: {channel}!</h3>
        </div>
    )
}