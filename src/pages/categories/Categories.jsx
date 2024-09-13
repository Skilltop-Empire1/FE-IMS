import React from 'react'
import TitleBar from '../../components/settings/TitleBar'
import { PlusIcon } from 'lucide-react'
import CategorySearchBar from '../../components/categories/CategorySearchBar'
import CategoryGrid from '../../components/categories/CategoryGrid'

function Categories() {
  return (
    <div>
      <TitleBar
        title="Categories"
        subtitle="Last update January 29, 2023 at 2.39PM"
      >
        <button className="text-white bg-imsPurple rounded-full font-semibold flex gap-2 px-4 py-2 text-xs items-center focus:ring-imsLightPurple focus:ring-offset-2 focus:ring-1">
          <PlusIcon size={15} />
          <span>Add Category</span>
        </button>
      </TitleBar>
      <div>
        <CategorySearchBar />
        <CategoryGrid />
      </div>
    </div>
  )
}

export default Categories
