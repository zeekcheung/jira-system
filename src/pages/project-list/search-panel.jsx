export default function SearchPanel({users, param, setParam}) {
  return (
    <form>
      <input type="text" value={param.name} onChange={(event) => {
        setParam({
          ...param,
          name: event.target.value
        })
      }} />
      <select value={param.personId} onChange={(event) => {
        setParam({
          ...param,
          personId: event.target.value
        })
      }}>
        <option value={''}>负责人</option>
        {
          users.map(user => <option value={user.id} key={user.id}>{user.name}</option>)
        }
      </select>
    </form>
  )
}