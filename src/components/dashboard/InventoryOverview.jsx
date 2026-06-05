export default function InventoryOverview(){
  return (
    <div className="bg-white rounded-xl border p-5" style={{borderColor:'var(--color-border)'}}>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-white text-xs uppercase" style={{backgroundColor:'var(--color-primary)'}}>
              <th className="text-left px-3 py-2">Status</th>
              <th className="text-left px-3 py-2">Total Stands</th>
              <th className="text-left px-3 py-2">Total SQM</th>
              <th className="text-left px-3 py-2">Sponsors Stands</th>
              <th className="text-left px-3 py-2">Exhibitors Stands</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b" style={{borderColor:'var(--color-border-light)'}}>
              <td className="px-3 py-3"><span className="text-white bg-black rounded-full px-3 py-1 text-xs">CONFIRMED</span></td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
            </tr>

            <tr className="border-b" style={{borderColor:'var(--color-border-light)'}}>
              <td className="px-3 py-3"><span className="text-[var(--color-primary)] border border-[var(--color-primary)] rounded-full px-3 py-1 text-xs">RESERVED</span></td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
            </tr>

            <tr className="border-b" style={{borderColor:'var(--color-border-light)'}}>
              <td className="px-3 py-3"><span className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs">AVAILABLE</span></td>
              <td className="px-3 py-3">59</td>
              <td className="px-3 py-3">1347</td>
              <td className="px-3 py-3">26</td>
              <td className="px-3 py-3">33</td>
            </tr>

            <tr className="bg-[var(--color-border-light)] font-semibold">
              <td className="px-3 py-3">TOTAL</td>
              <td className="px-3 py-3">59</td>
              <td className="px-3 py-3">1347</td>
              <td className="px-3 py-3">26</td>
              <td className="px-3 py-3">33</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
