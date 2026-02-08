import React, { useState } from 'react'
import { usePoints } from '../context/PointsContext'
import type { Task } from '../types'
import './Checklist.css'

export function Checklist() {
  const { tasks, addTask, toggleTask, deleteTask } = usePoints()
  const [title, setTitle] = useState('')
  const [points, setPoints] = useState(5)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const t = title.trim()
    if (!t || points < 0) return
    addTask({ title: t, points })
    setTitle('')
    setPoints(5)
  }

  return (
    <div className="checklist">
      <div className="checklist__card">
        <h2 className="checklist__title">Your tasks</h2>
        <p className="checklist__sub">Set tasks and earn points when you complete them.</p>
        <form className="checklist__form" onSubmit={handleAdd}>
          <input
            type="text"
            className="checklist__input"
            placeholder="What do you need to do?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="checklist__row">
            <label className="checklist__points-label">
              Points
              <input
                type="number"
                min={0}
                max={999}
                value={points}
                onChange={(e) => setPoints(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="checklist__points"
              />
            </label>
            <button type="submit" className="checklist__add">Add task</button>
          </div>
        </form>
        <ul className="checklist__list">
          {tasks.length === 0 ? (
            <li className="checklist__empty">No tasks yet. Add one above.</li>
          ) : (
            tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

function TaskRow({
  task,
  onToggle,
  onDelete,
}: {
  task: Task
  onToggle: () => void
  onDelete: () => void
}) {
  return (
    <li className={`checklist__item ${task.done ? 'done' : ''}`}>
      <button type="button" className="checklist__checkbox" onClick={onToggle} aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}>
        {task.done ? (
          <span className="checklist__check">✓</span>
        ) : (
          <span className="checklist__box" />
        )}
      </button>
      <span className="checklist__item-title">{task.title}</span>
      <span className="checklist__item-points">+{task.points}</span>
      <button type="button" className="checklist__delete" onClick={onDelete} aria-label="Delete task">
        ×
      </button>
    </li>
  )
}
