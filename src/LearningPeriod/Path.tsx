




// 1. This is our blueprint (the rules) for what a Player looks like
interface Player {
    username: string;
    level: number;
    isOnline: boolean;
}


// 2. This is a function that welcomes the player. 
// It ONLY accepts inputs that follow the "Player" blueprint.
function greetPlayer(player: Player): string {
  return `Welcome back, {player.username}! Yoy're level ${player.level}.`;
}

// 3. Let's create a player that follows the rules
const activePlayer: Player = {
    username: "Elijah",
    level: 12,
    isOnline: true
};

console.log(greetPlayer(activePlayer));




// 1. Define what options this button can take
interface ButtonProps {
  text: string;
  color: 'red' | 'blue';
  onClick: () => void;
}

// 2. Create the master button component
export function CustomButton({ text, color, onClick }: ButtonProps) {
  // If the color is red, use the 'danger' class. Otherwise use 'primary'.
  const buttonStyle = color === 'red' ? 'btn-danger' : 'btn-primary';

  return (
    <button className={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
}


// <!-- ❌ BAD: A blind person's screen reader cannot read this. 
//      They can't click it easily using a keyboard tab. -->
// <div class="delete-icon" onclick="deleteItem()">🗑️</div>


// <!--  GOOD: Accessible Button -->
// <button class="delete-btn" onclick="deleteItem()" aria-label="Delete this item">
//   <span aria-hidden="true">🗑️</span>
// </button>


