import React from 'react'
import cssobj from '@/css/cmtList.scss'

export default function CmtItem(props) {
    return <div className ={cssobj.item}>
                <h1 className={cssobj.user}>评论人:{props.user}</h1>
                <p className={cssobj.content}>评论内容:{props.content}</p>
             </div>
}