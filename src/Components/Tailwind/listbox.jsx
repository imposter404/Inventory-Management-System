import { Field, Label } from '@/components/fieldset'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'

function Listbox() {
  return (
    <Field>
      <Label>Project status</Label>
      <Listbox name="status" defaultValue="active">
        <ListboxOption value="active">
          <ListboxLabel>Active</ListboxLabel>
        </ListboxOption>
        <ListboxOption value="paused">
          <ListboxLabel>Paused</ListboxLabel>
        </ListboxOption>
        <ListboxOption value="delayed">
          <ListboxLabel>Delayed</ListboxLabel>
        </ListboxOption>
        <ListboxOption value="canceled">
          <ListboxLabel>Canceled</ListboxLabel>
        </ListboxOption>
      </Listbox>
    </Field>
  )
}