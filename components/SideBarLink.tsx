import Image from 'next/image'
interface SideBarLink{
  text:string
  Icon:any,
  active?:boolean
}
export function SideBarLink(props: SideBarLink){
  const { Icon ,text ,active} = props
  return <div className={`text-blue-600 dark:text-white flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${active && "font-bold"}`}>
    <Icon className="h-7"></Icon>
    <span className='hidden xl:inline'>{text}</span>
  </div>
}
