/*
 * File   : $Source: /alkacon/cvs/opencms/src/org/opencms/xml/containerpage/CmsContainerPageBean.java,v $
 * Date   : $Date: 2011/02/18 07:40:47 $
 * Version: $Revision: 1.8 $
 *
 * This library is part of OpenCms -
 * the Open Source Content Management System
 *
 * Copyright (c) 2002 - 2009 Alkacon Software GmbH (http://www.alkacon.com)
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * For further information about Alkacon Software GmbH, please see the
 * company website: http://www.alkacon.com
 *
 * For further information about OpenCms, please see the
 * project website: http://www.opencms.org
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

package org.opencms.xml.containerpage;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

/**
 * Describes one locale of a container page.<p>
 * 
 * @author Michael Moossen
 * 
 * @version $Revision: 1.8 $ 
 * 
 * @since 7.6
 */
public class CmsContainerPageBean {

    /** The request attribute key for the container-page bean. */
    public static final String ATTR_KEY_CONTAINERPAGE_BEAN = "containerpageBean";

    /** The request attribute key for the current container. */
    public static final String ATTR_KEY_CURRENTCONTAINER = "currentContainer";

    /** The request attribute key for the current container. */
    public static final String ATTR_KEY_CURRENTCONTAINER_WIDTH = "currentContainerWidth";

    /** The containers. */
    private final Map<String, CmsContainerBean> m_containers;

    /** The locale. */
    private final Locale m_locale;

    /** The container names in the right order. */
    private final List<String> m_names;

    /** The supported types. */
    private final Set<String> m_types;

    /** 
     * Creates a new container page bean.<p> 
     * 
     * @param locale the locale
     * @param containers the containers
     **/
    public CmsContainerPageBean(Locale locale, List<CmsContainerBean> containers) {

        m_locale = locale;
        Map<String, CmsContainerBean> cnts = new HashMap<String, CmsContainerBean>();
        Set<String> types = new HashSet<String>();
        List<String> names = new ArrayList<String>();
        for (CmsContainerBean container : containers) {
            cnts.put(container.getName(), container);
            types.add(container.getType());
            names.add(container.getName());
        }
        m_containers = Collections.unmodifiableMap(cnts);
        m_types = Collections.unmodifiableSet(types);
        m_names = Collections.unmodifiableList(names);
    }

    /**
     * Returns the containers.<p>
     *
     * @return the containers
     */
    public Map<String, CmsContainerBean> getContainers() {

        return m_containers;
    }

    /**
     * Returns the locale.<p>
     *
     * @return the locale
     */
    public Locale getLocale() {

        return m_locale;
    }

    /**
     * Returns the list of container names.<p>
     *
     * @return the list of container names
     */
    public List<String> getNames() {

        return m_names;
    }

    /**
     * Returns the types.<p>
     *
     * @return the types
     */
    public Set<String> getTypes() {

        return m_types;
    }
}
