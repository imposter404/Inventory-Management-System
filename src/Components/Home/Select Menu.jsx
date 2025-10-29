import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon,CreditCardIcon,CurrencyRupeeIcon } from '@heroicons/react/20/solid'

const people = [
  {id: 1,name: 'UPI', },
  {id: 2,name: 'CASH',},
]

export default function SelectMenu() {
  const [selected, setSelected] = useState(people[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="block text-sm/6 font-medium text-white"></Label>
      <div className="relative w-full">
        <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-md bg-gray-800/50 py-1.5 pr-2 pl-3 text-left text-white outline-1 -outline-offset-1 outline-white/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500 sm:text-sm/6">
            {selected.name=='UPI' ?
              <CreditCardIcon
                className="col-start-1 row-start-1 size-5 self-center ml-3 text-gray-400 sm:size-4"
              />:
              <CurrencyRupeeIcon
                className="col-start-1 row-start-1 size-5 self-center ml-3 text-gray-400 sm:size-4"
              />
            }
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6 pl-3 mode">
            <span className="block truncate pl-3">{selected.name}</span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
          />
        </ListboxButton>


        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base outline-1 -outline-offset-1 outline-white/10 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {people.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="group relative cursor-pointer py-2 pr-3 pl-3 text-white select-none data-focus:bg-indigo-500 data-focus:outline-hidden"
            >
              <div className="flex items-center">
                {person.name=='UPI' ?
                <CreditCardIcon
                  className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                />:
                <CurrencyRupeeIcon
                  className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                />
                }
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{person.name}</span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
