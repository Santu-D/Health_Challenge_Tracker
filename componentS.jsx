/**
 * v0 by Vercel.
 * @see https://v0.dev/t/V8YyDn4vS40
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Pagination } from "@/components/ui/pagination"

export default function Component() {
  const [workouts, setWorkouts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [workoutsPerPage] = useState(10)
  const handleAddWorkout = (name, type, minutes) => {
    const newWorkout = { name, type, minutes }
    setWorkouts([...workouts, newWorkout])
  }
  const filteredWorkouts = workouts.filter((workout) => {
    return (
      workout.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "" || workout.type === filterType)
    )
  })
  const indexOfLastWorkout = currentPage * workoutsPerPage
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage
  const currentWorkouts = filteredWorkouts.slice(indexOfFirstWorkout, indexOfLastWorkout)
  const totalPages = Math.ceil(filteredWorkouts.length / workoutsPerPage)
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Workout Tracker</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Workout Type</Label>
            <Select id="type">
              <option value="">Select a workout type</option>
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
              <option value="strength">Strength Training</option>
              <option value="yoga">Yoga</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="minutes">Minutes</Label>
            <Input id="minutes" type="number" placeholder="Enter minutes" />
          </div>
        </div>
        <Button
          className="mt-4"
          onClick={() => {
            const name = document.getElementById("name").value
            const type = document.getElementById("type").value
            const minutes = document.getElementById("minutes").value
            handleAddWorkout(name, type, minutes)
          }}
        >
          Add Workout
        </Button>
      </div>
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Input
            className="flex-1 mr-4"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select className="mr-4" value={filterType} onValueChange={(e) => setFilterType(e.target.value)}>
            <option value="">Filter by type</option>
            <option value="running">Running</option>
            <option value="cycling">Cycling</option>
            <option value="strength">Strength Training</option>
            <option value="yoga">Yoga</option>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Minutes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentWorkouts.map((workout, index) => (
              <TableRow key={index}>
                <TableCell>{workout.name}</TableCell>
                <TableCell>{workout.type}</TableCell>
                <TableCell>{workout.minutes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  )
}