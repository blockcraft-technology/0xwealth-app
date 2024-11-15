import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-400">
      <Card className="w-full max-w-md bg-yellow-50 border-2 border-yellow-300 shadow-lg shadow-yellow-300/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-yellow-800">Welcome to 0xWealth</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg text-yellow-700">
            Hello, World
          </p>
        </CardContent>
      </Card>
    </div>
  )
}