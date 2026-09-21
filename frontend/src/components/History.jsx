   function History({ items }) {
     return (
       <aside style={{ width: '260px', flexShrink: 0 }}>
         <h3 style={{ fontSize: '13px', color: '#6b6458', fontWeight: 500, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
           Historique
        </h3>
  
        {items.length === 0 && (
          <p style={{ fontSize: '13px', color: '#a39d8f' }}>Vos actions récentes apparaîtront ici.</p>
        )}
  
        {items.map((item, index) => (
         <div key={index} style={{ padding: '10px 0', borderBottom: '1px solid #e4ddd0' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              color: item.type === 'Correction' ? '#c0392b' : '#4c7a5e',
              textTransform: 'uppercase',
            }}>
              {item.type}
           </span>
           <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#1d2230' }}>
             {item.snippet}
           </p>
          </div>
        ))}
     </aside>
    )
  }
  
  export default History