interface SeedProduct {
  id: string;
  name: string;
  category: string;
}

export const initialProducts: SeedProduct[] = [
  {name: 'Full-suspension', category: 'Frame Type', id:'f5ce45ca-4622-4080-85d7-9759a84e24a2'},
  {name: 'Diamond', category: 'Frame Type', id:'6a768ebb-714d-4b6f-bce9-e2adb671fe7a'},
  {name: 'Step-through', category: 'Frame Type', id:'8e547998-8d80-47d4-b2f1-d8ccf0c1042f'},
  {name: 'Mate', category:'Frame Finish', id:'f458a10b-c8fc-4f9e-9b78-4485949c24ef'},
  {name: 'Gloss', category:'Frame Finish', id:'42f580e5-0cae-4f57-ab94-9dfbafb903d7'},
  {name:'Road wheels', category: 'Wheels', id:'f8c98bda-c79b-4b49-a959-d55036b4b06e'},
  {name:'Mountain wheels', category: 'Wheels', id:'25615538-06e2-463b-a265-7db121c4b3df'},
  {name:'Fat bike wheels', category: 'Wheels', id:'049d3c1a-28f3-41c2-99dc-a743b73def7d'},
  {name:'Red', category: 'Rim color', id:'5203cb50-dfc8-4da1-b34f-7e58faf019cb'},
  {name:'Black', category: 'Rim color', id:'e3ad6e24-6dc8-45e0-9666-193f9108e27b'},
  {name:'Blue', category: 'Rim color', id:'5e023976-4729-4743-b7ad-0bf8e5d6a29b'},
  {name:'Single-speed chain', category: 'Chain', id:'cb0a8b9f-84cc-4328-817b-240717585e26'},
  {name:'8-speed chain', category: 'Chain', id:'dd5d091c-a944-4b50-af19-072bd568320e'},
]