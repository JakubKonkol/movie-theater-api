# Schema
### Movie
- id: number
- title: string
- year: number
- runtime: number
- cast: string[]

### Reservations
- id: number
- date: string
- startTime: DateTime
- endTime: DateTime
- movie: Movie
- room: room

### room
- id: number
- name: string
- capacity: number