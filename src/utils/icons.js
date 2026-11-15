/**
 * Icon registry — lets data files reference icons by name (strings),
 * keeping content free of UI imports. Add an icon here to use it in data.
 */
import {
  Landmark,
  Workflow,
  BrainCircuit,
  LineChart,
  Code2,
  Server,
  LayoutTemplate,
  Database,
  Wrench,
  Sparkles,
  Medal,
  Terminal,
  Briefcase,
  GraduationCap,
  Rocket,
  Boxes,
  Cpu,
  Globe,
  Orbit,
  ShoppingBag,
  LayoutDashboard,
  Palette,
  SquareTerminal,
} from 'lucide-react'

const registry = {
  Landmark,
  Workflow,
  BrainCircuit,
  LineChart,
  Code2,
  Server,
  LayoutTemplate,
  Database,
  Wrench,
  Sparkles,
  Medal,
  Terminal,
  Briefcase,
  GraduationCap,
  Rocket,
  Boxes,
  Cpu,
  Globe,
  Orbit,
  ShoppingBag,
  LayoutDashboard,
  Palette,
  SquareTerminal,
}

export function getIcon(name) {
  return registry[name] || Boxes
}
