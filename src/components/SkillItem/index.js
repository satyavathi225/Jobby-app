import './index.css'

const SkillItem = ({eachSkill}) => {
  const {imageUrl, name} = eachSkill
  return (
    <li className="skill-item-container">
      <img className="skill-image" src={imageUrl} alt={name} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillItem
