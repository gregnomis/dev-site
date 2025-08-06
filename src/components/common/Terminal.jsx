import './Terminal.css';

const Terminal = ({ lines, isAnalyzing, projectId }) => {
  const projectTerminals = {
    'LockChain': {
      user: 'greg@lockchain',
      path: '~/repos/lockchain/src'
    },
    'AiQArt': {
      user: 'greg@aiqart',
      path: '~/repos/aiqart/src'
    },
    'SolMate': {
      user: 'greg@solmate',
      path: '~/repos/solmate/src'
    }
  };
  
  const terminal = projectTerminals[projectId] || projectTerminals['LockChain'];
  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button red"></div>
          <div className="terminal-button yellow"></div>
          <div className="terminal-button green"></div>
        </div>
        <div className="terminal-title">{terminal.user}: {terminal.path}</div>
        <div></div>
      </div>
      <div className="terminal-content">
        {lines.length === 0 ? (
          <div className="terminal-line active">
            <span className="prompt">{terminal.user}:{terminal.path}$</span>
          </div>
        ) : (
          <>
            <div className="terminal-line">
              <span className="prompt">{terminal.user}:{terminal.path}$</span> git ls-files | xargs cloc --git
            </div>
            {lines.map((line, index) => (
              <div key={index} className="terminal-line output-line">
                {line}
              </div>
            ))}
            {!isAnalyzing && (
              <div className="terminal-line active">
                <span className="prompt">{terminal.user}:{terminal.path}$</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Terminal;
