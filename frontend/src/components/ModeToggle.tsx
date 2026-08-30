import SegmentedToggle from './SegmentedToggle'

export type ViewMode = 'live' | 'historical'

interface ModeToggleProps {
  mode: ViewMode
  onModeChange: (mode: ViewMode) => void
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <SegmentedToggle<ViewMode>
      ariaLabel="Telemetry view mode"
      segmentRem={7}
      value={mode}
      onChange={onModeChange}
      options={[
        { value: 'live', label: 'Live' },
        { value: 'historical', label: 'Historical' },
      ]}
    />
  )
}
